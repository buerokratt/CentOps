package ee.buerokratt.secretmanager.controller;

import ee.buerokratt.secretmanager.dto.ApiResponse;
import ee.buerokratt.secretmanager.dto.SecretRequest;
import ee.buerokratt.secretmanager.service.SecretManagerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/secrets")
@RequiredArgsConstructor
public class SecretManagerController {

    private final SecretManagerService secretManagerService;

    @PostMapping
    public ResponseEntity<Void> createSecret(@Valid @RequestBody SecretRequest request) {
        secretManagerService.createSecret(request);
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/{key}")
    public ResponseEntity<ApiResponse> getSecret(@PathVariable String key) {
        return ResponseEntity
                .ok(ApiResponse.success(secretManagerService.getSecret(key)));
    }

    @PutMapping("/{key}")
    public ResponseEntity<Void> updateSecret(
            @PathVariable String key,
            @Valid @RequestBody SecretRequest request) {
        boolean updated = secretManagerService.updateSecret(key, request);
        return updated
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<Void> deleteSecret(@PathVariable String key) {
        secretManagerService.deleteSecret(key);
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSecrets() {
        return ResponseEntity
                .ok(ApiResponse.success(secretManagerService.getAllSecrets()));
    }
}