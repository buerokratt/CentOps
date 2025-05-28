package ee.buerokratt.secretmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private Object data;

    public static ApiResponse success(Object data) {
        return new ApiResponse(data);
    }

    public static ApiResponse success() {
        return new ApiResponse(null);
    }

    public static ApiResponse error(String message) {
        return new ApiResponse(null);
    }
}
