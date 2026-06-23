<script>
	import { includeLayovers } from "../lib/stores.js";
	let checked = $state($includeLayovers);
	$effect(() => {
		includeLayovers.set(checked);
	});
</script>

<label class="form-control">
  <input type="checkbox" name="checkbox" bind:checked />
  Include flights that can be replaced with one layover
</label>


<style>
	label {
		font-size: 14px;
		font-weight: 400;
		line-height: 17px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--neutral-500);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5px;
	}

	/* CSS-only custom checkbox taken by: */
	/* https://moderncss.dev/pure-css-custom-checkbox-style/ */
	input[type="checkbox"] {
		/* Add if not using autoprefixer */
		-webkit-appearance: none;
		/* Remove most all native input styles */
		appearance: none;
		/* For iOS < 15 */
		background-color: transparent;
		/* Not removed via appearance */
		margin: 0;
		font: inherit;
		color: var(--neutral-700);
		width: 20px;
		height: 20px;
		border: 1px solid var(--neutral-700);
		border-radius: 4px;
		display: grid;
		place-content: center;
		position: relative;
	}

	input[type="checkbox"]:checked {
		background-color: var(--neutral-700);
	}
			
	input[type="checkbox"]::before {
		content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEzIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Ljg3NTI1IDYuNjUzNUwxMS4xOTQ3IDAuMzMzMzEzTDEyLjE2NzYgMS4zMDU0NEw0Ljg3NTI1IDguNTk3NzVMMC41IDQuMjIyNUwxLjQ3MjEzIDMuMjUwMzhMNC44NzUxNSA2LjY1MzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K");
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		opacity: 0;
	}
			
	input[type="checkbox"]:checked::before {
		opacity: 1;
	}
			
	input[type="checkbox"]:focus {
		outline: 3px solid rgba(0,0,0,.15);
	}
</style>
