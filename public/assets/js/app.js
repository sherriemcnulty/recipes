$(function() {
	// Delete
	$(".delrecipe").on("click", function(event) {
		// prevent submit action from triggering prematurely
		event.preventDefault();

		let id = $(this).data("id");

		$.ajax("/api/recipes/" + id, {
			type: "DELETE"
		}).then(function() {
			// Confirm & load recipes list
			$("body").load(`/api`);
		});
	});

	// Insert
	$("#add-recipe").on("click", function(event) {
		// prevent submit action from triggering prematurely
		event.preventDefault();

		let newRecipe = {
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

	$("#update-recipe").on("click", function(event) {
		event.preventDefault();

		let id = $("#update-form").attr("data-id");

		let updatedRecipe = {
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
			// Show recipe for user confirmation
			$("body").load(`/api/${id}`);
		});
	});
});
