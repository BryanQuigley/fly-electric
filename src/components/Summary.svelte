<script>
	import { range, spokes, visibleSpokes, selectedAirport } from "../lib/stores.js";
	import { roundPercentage, formatNumber } from "../lib/utils.js";
</script>

<p>
	Electric planes with a <span id="range">{$range}mi range</span> could replace 
	<br/>
	<span id="flights">
		{roundPercentage($visibleSpokes.flights, $spokes.flights)}% of flights
		{#if $selectedAirport}
			from {$selectedAirport}
		{/if}
	</span>
	accounting for <span id="co2">{ formatNumber($visibleSpokes.co2) } metric tons CO<sub>2</sub></span>
</p>


<style>
	p {
		font-size: 28px;
		font-weight: 400;
		line-height: 42px;
		letter-spacing: -0.02em;
		text-align: center;
		color: var(--neutral-700);
	}

	#range {
		color: #000;
		font-weight: 600;
		white-space: nowrap;
	}

	#flights {
		font-weight: 600;
		white-space: nowrap;
	}

	#co2 {
		color: #00953C;
		white-space: nowrap;
	}

</style>