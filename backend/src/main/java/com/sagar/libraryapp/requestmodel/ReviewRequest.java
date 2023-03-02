package com.sagar.libraryapp.requestmodel;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;

public record ReviewRequest(@DecimalMin(value = "0.5") @Max(5) float rating, String review) {
}
