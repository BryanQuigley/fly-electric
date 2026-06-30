<script>
	let { referenceFlights, directFlights } = $props();

	let directPercentage = $derived(directFlights / referenceFlights * 100);

	function oorOpacity(percentage) {
		if(percentage <= 85) return 1;
		return (90 - percentage) / 5;
	}

	function flightLabelOpacity(percentage) {
		if(percentage >= 5) return 1;
		return (percentage - 4) / 2;
	}
</script>

<div id="container">
	<div id="chart">
		<div id="outofrange" style="opacity: {oorOpacity(directPercentage)};">
			<span>Out of range</span>
		</div>
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
		
	#direct, #outofrange {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#direct span, #outofrange span {
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
