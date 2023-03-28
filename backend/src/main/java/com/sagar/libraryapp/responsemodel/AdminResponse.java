package com.sagar.libraryapp.responsemodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminResponse(@NotNull @NotBlank String response) {
}
