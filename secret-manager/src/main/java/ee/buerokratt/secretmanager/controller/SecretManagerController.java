package ee.buerokratt.secretmanager.controller;

import ee.buerokratt.secretmanager.dto.ApiResponse;
import ee.buerokratt.secretmanager.dto.SecretRequest;
import ee.buerokratt.secretmanager.service.SecretManagerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/secrets")
@RequiredArgsConstructor
public class SecretManagerController {

    private static final String SECRET_CREATED = "Secret created successfully";
    private static final String SECRET_RETRIEVED = "Secret retrieved successfully";
    private static final String SECRET_UPDATED = "Secret updated successfully";
    private static final String SECRET_DELETED = "Secret deleted successfully";
    private static final String SECRETS_RETRIEVED = "Secrets retrieved successfully";

    private final SecretManagerService secretManagerService;

    @PostMapping
    public ResponseEntity<ApiResponse> createSecret(@Valid @RequestBody SecretRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(secretManagerService.createSecret(request)));
    }

    @GetMapping("/{key}")
    public ResponseEntity<ApiResponse> getSecret(@PathVariable String key) {
        return ResponseEntity
                .ok(ApiResponse.success(secretManagerService.getSecret(key)));
    }

    @PutMapping("/{key}")
    public ResponseEntity<ApiResponse> updateSecret(
            @PathVariable String key,
            @Valid @RequestBody SecretRequest request) {
        return ResponseEntity
                .ok(ApiResponse.success(secretManagerService.updateSecret(key, request)));
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<ApiResponse> deleteSecret(@PathVariable String key) {
        secretManagerService.deleteSecret(key);
        return ResponseEntity
                .ok(ApiResponse.success());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSecrets() {
        return ResponseEntity
                .ok(ApiResponse.success(secretManagerService.getAllSecrets()));
    }
}