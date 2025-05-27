package ee.buerokratt.secretmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Map;

@Data
public class SecretRequest {
    @NotBlank(message = "Secret key cannot be blank")
    private String key;

    @NotEmpty(message = "Secret data cannot be empty")
    private Map<String, Object> data;
}
