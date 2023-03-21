package com.sagar.libraryapp.requestmodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MessageRequest(@NotNull @NotBlank String title, @NotNull @NotBlank String question) {
}
