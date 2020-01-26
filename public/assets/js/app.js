$(function() {
	// Delete a recipe
	$(".delrecipe").on("click", function(event) {
		// prevent submit action from triggering prematurely
		event.preventDefault();

		const id = $(this).data("id");

		$.ajax("/api/recipes/" + id, {
			type: "DELETE"
		}).then(function() {
			// Confirm & load recipes list
			$("body").load(`/api`);
		});
	});

	// Add a new recipe
	$("#add-recipe").on("click", function(event) {
		// prevent submit action from triggering prematurely
		event.preventDefault();

		const newRecipe = {
			title: $("#title")
				.val()
				.trim(),
			prep_time: $("#prep_time")
				.val()
				.trim(),
			ingredients: $("#ingredients")
				.val()
				.trim(),
			directions: $("#directions")
				.val()
				.trim(),
			servings: $("#servings")
				.val()
				.trim()
		};

		$.ajax(`/api/recipes`, {
			type: "POST",
			data: newRecipe
		}).then(function() {
			// Show all recipes for user confirmation
			$("body").load("/api");
		});
	});

	// Update a recipe
	$("#update-recipe").on("click", function(event) {
		event.preventDefault();

		const id = $("#update-form").attr("data-id");

		const updatedRecipe = {
			title: $("#title")
				.val()
				.trim(),
			prep_time: $("#prep_time")
				.val()
				.trim(),
			ingredients: $("#ingredients")
				.val()
				.trim(),
			directions: $("#directions")
				.val()
				.trim(),
			servings: $("#servings")
				.val()
				.trim()
		};

		$.ajax("/api/recipes/" + id, {
			type: "PUT",
			data: updatedRecipe
		}).then(function() {
			// Display the recipe for user confirmation
			$("body").load(`/api/${id}`);
		});
	});
});
