package ee.buerokratt.secretmanager.service;

import ee.buerokratt.secretmanager.dto.SecretRequest;
import ee.buerokratt.secretmanager.dto.SecretResponse;

import java.util.List;

public interface SecretManagerService {

    void createSecret(SecretRequest request);

    SecretResponse getSecret(String key);

    boolean updateSecret(String key, SecretRequest request);

    void deleteSecret(String key);

    List<SecretResponse> getAllSecrets();

}
