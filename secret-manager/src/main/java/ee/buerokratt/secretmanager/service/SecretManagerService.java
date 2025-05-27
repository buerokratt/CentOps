package ee.buerokratt.secretmanager.service;

import ee.buerokratt.secretmanager.dto.SecretRequest;
import ee.buerokratt.secretmanager.dto.SecretResponse;

import java.util.List;

public interface SecretManagerService {

    SecretResponse createSecret(SecretRequest request);

    SecretResponse getSecret(String key);

    SecretResponse updateSecret(String key, SecretRequest request);

    boolean deleteSecret(String key);

    List<SecretResponse> getAllSecrets();

}
