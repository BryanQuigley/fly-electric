<script>
	import { includeLayovers } from "../lib/stores";

	let { referenceFlights, directFlights, layoverFlights } = $props();

	let directPercentage = $derived(directFlights / referenceFlights * 100);
	let layoverPercentage = $derived($includeLayovers ? layoverFlights / referenceFlights * 100 : 0);

	function oorOpacity(percentage) {
		// map: 90 => 0
		// map: 85 => 1
		if(percentage <= 85) return 1;
		return (90 - percentage) / 5;
	}

	function flightLabelOpacity(percentage) {
		// map: 5 => 1
		// map: 4 => 0
		if(percentage >= 5) return 1;
		return (percentage - 4) / 2;
	}
</script>

<div id="container">
	<div id="chart">
		<div id="outofrange" style="opacity: {oorOpacity(layoverPercentage+directPercentage)};">
			<span>Out of range</span>
		</div>
		{#if $includeLayovers}
			<div id="layover" style="height: {layoverPercentage}%;">
				<span style="opacity: {flightLabelOpacity(layoverPercentage)};">{Math.round(layoverPercentage)}%</span>
		</div>
		{/if}
		<div id="direct" style="height: {directPercentage}%;">
			<span style="opacity: {flightLabelOpacity(directPercentage)};">{Math.round(directPercentage)}%</span>
		</div>
	</div>
	<div id="legend">
		<span style="top: 0%">100%</span>
		<span style="top: 25%">75</span>
		<span style="top: 50%">50</span>
		<span style="top: 75%">25</span>
		<span style="top: 99.75%">0</span>
	</div>
</div>

<style>
	#container {
		height: 300px;
		display: flex;
		flex-direction: row;
		margin-top: 10px;
	}

	#chart {
		width: 70px;
		background-color: var(--neutral-50);
		border: 1px solid var(--neutral-300);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
	}
		
	#layover, #direct, #outofrange {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Flatted span styling inside the chart segments */
	#layover span, #direct span, #outofrange span {
		text-align: center;
		color: #FFF;
		font-size: 12px;
		font-weight: 500;
		line-height: 14px;
		letter-spacing: 0em;
		height: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#direct { background-color: var(--primary-direct); }
	#layover { background-color: var(--primary-layover); }

	#outofrange {
		flex-grow: 1;
	}
		
	/* Specific style modifier for the out-of-range text color */
	#outofrange span {
		color: var(--neutral-500);
	}

	#legend {
		width: 60px;
		height: 100%;
		position: relative;
	}

	/* Flattened legend text indicator ticks */
	#legend span {
		position: absolute;
		height: 1px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		border-left: 6px solid var(--neutral-300);
		width: 100%;
		padding-left: 3px;
		font-size: 12px;
		font-weight: 400;
		line-height: 14px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--neutral-500);
	}
</style>
