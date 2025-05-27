package ee.buerokratt.secretmanager.service;

import ee.buerokratt.secretmanager.dto.SecretRequest;
import ee.buerokratt.secretmanager.dto.SecretResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.VaultResponse;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecretManagerServiceImpl implements SecretManagerService {

    private static final String CUBBYHOLE_PATH_PREFIX = "cubbyhole/";
    private static final String CREATED_AT_FIELD = "_createdAt";
    private static final String UPDATED_AT_FIELD = "_updatedAt";
    private static final String VERSION_FIELD = "_version";

    private final VaultTemplate vaultTemplate;

    @Override
    public SecretResponse createSecret(SecretRequest request) {
        log.info("Creating secret with key: {}", request.getKey());

        Map<String, Object> secretData = createSecretDataWithMetadata(request.getData());
        vaultTemplate.write(buildVaultPath(request.getKey()), secretData);

        return buildSuccessResponse(
                request.getKey(),
                request.getData(),
                secretData.get(CREATED_AT_FIELD).toString(),
                secretData.get(UPDATED_AT_FIELD).toString(),
                secretData.get(VERSION_FIELD).toString(),
                "Secret created successfully"
        );
    }

    @Override
    public SecretResponse getSecret(String key) {
        log.info("Retrieving secret with key: {}", key);

        return Optional.of(vaultTemplate.read(buildVaultPath(key)))
                .map(VaultResponse::getData)
                .map(data -> extractSecretResponse(key, data))
                .orElseGet(() -> {
                    log.warn("Secret not found: {}", key);
                    return createErrorResponse();
                });
    }

    @Override
    public SecretResponse updateSecret(String key, SecretRequest request) {
        log.info("Updating secret with key: {}", key);

        return Optional.of(vaultTemplate.read(buildVaultPath(key)))
                .map(VaultResponse::getData)
                .map(existingData -> processSecretUpdate(key, request, existingData))
                .orElseGet(() -> {
                    log.warn("Secret not found for update: {}", key);
                    return createErrorResponse();
                });
    }

    @Override
    public boolean deleteSecret(String key) {
        log.info("Deleting secret with key: {}", key);

        return Optional.of(vaultTemplate.read(buildVaultPath(key)))
                .map(VaultResponse::getData)
                .map(data -> {
                    vaultTemplate.delete(buildVaultPath(key));
                    log.info("Secret deleted successfully: {}", key);
                    return true;
                })
                .orElse(false);
    }

    @Override
    public List<SecretResponse> getAllSecrets() {
        log.info("Retrieving all secrets from cubbyhole");

        return Optional.ofNullable(vaultTemplate.list(CUBBYHOLE_PATH_PREFIX))
                .orElseGet(Collections::emptyList)
                .parallelStream()
                .map(this::getSecret)
                .filter(SecretResponse::isSuccess)
                .toList();
    }

    private SecretResponse extractSecretResponse(String key, Map<String, Object> vaultData) {
        Map<String, Object> userData = new HashMap<>(vaultData);

        String createdAt = (String) userData.remove(CREATED_AT_FIELD);
        String updatedAt = (String) userData.remove(UPDATED_AT_FIELD);
        String version = (String) userData.remove(VERSION_FIELD);

        return buildSuccessResponse(
                key,
                userData,
                createdAt,
                updatedAt,
                version,
                "Secret retrieved successfully"
        );
    }

    private SecretResponse processSecretUpdate(String key, SecretRequest request, Map<String, Object> existingData) {
        String createdAt = Optional.ofNullable((String) existingData.get(CREATED_AT_FIELD))
                .orElseGet(() -> LocalDateTime.now().toString());

        int newVersion = Optional.ofNullable((String) existingData.get(VERSION_FIELD))
                .map(version -> Integer.parseInt(version) + 1)
                .orElse(2);

        Map<String, Object> secretData = createSecretDataWithMetadata(
                request.getData(),
                createdAt,
                String.valueOf(newVersion)
        );

        vaultTemplate.write(buildVaultPath(key), secretData);
        log.info("Secret updated successfully: {}", key);

        return buildSuccessResponse(
                key,
                request.getData(),
                createdAt,
                secretData.get(UPDATED_AT_FIELD).toString(),
                String.valueOf(newVersion),
                "Secret updated successfully"
        );
    }

    private Map<String, Object> createSecretDataWithMetadata(Map<String, Object> userData) {
        return createSecretDataWithMetadata(userData, LocalDateTime.now().toString(), "1");
    }

    private Map<String, Object> createSecretDataWithMetadata(Map<String, Object> userData, String createdAt, String version) {
        Map<String, Object> secretData = new HashMap<>(userData);
        secretData.put(CREATED_AT_FIELD, createdAt);
        secretData.put(UPDATED_AT_FIELD, LocalDateTime.now().toString());
        secretData.put(VERSION_FIELD, version);
        return secretData;
    }

    private SecretResponse buildSuccessResponse(
            String key,
            Map<String, Object> data,
            String createdAt,
            String updatedAt,
            String version,
            String message
    ) {
        return new SecretResponse(
                key,
                data,
                parseDateTime(createdAt),
                parseDateTime(updatedAt),
                version,
                true,
                message
        );
    }

    private SecretResponse createErrorResponse() {
        return new SecretResponse(null, null, null, null, null, false, "Secret not found");
    }

    private LocalDateTime parseDateTime(String dateTimeStr) {
        try {
            return dateTimeStr != null ? LocalDateTime.parse(dateTimeStr) : null;
        } catch (Exception e) {
            log.warn("Failed to parse datetime: {}", dateTimeStr);
            return null;
        }
    }

    private String buildVaultPath(String key) {
        return CUBBYHOLE_PATH_PREFIX + key;
    }
}