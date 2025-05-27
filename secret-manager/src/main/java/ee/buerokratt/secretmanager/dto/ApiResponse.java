package ee.buerokratt.secretmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private Object data;
    private String message;

    public static ApiResponse success(Object data) {
        return new ApiResponse(data, null);
    }

    public static ApiResponse success() {
        return new ApiResponse(null, null);
    }

    public static ApiResponse error(String message) {
        return new ApiResponse(null, message);
    }
}
