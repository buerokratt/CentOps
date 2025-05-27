package ee.buerokratt.secretmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecretResponse {
    private String key;
    private Map<String, Object> data;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String version;
    private boolean success;
    private String message;

}
