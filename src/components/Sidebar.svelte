<script>
	import { spokes, visibleSpokes, includeLayovers, selectedAirport } from "../lib/stores";
	import FlightStats from "/src/components/FlightStats.svelte";
	import BarChart from '/src/components/BarChart.svelte';
</script>

<div id="container">
	<h3>
		Replaceable flights
		{#if $selectedAirport}
			from {$selectedAirport}
		{/if}
	</h3>
	<div id="stats">
		<FlightStats 
			label={'Direct'} 
			color={'var(--primary-direct)'}
			passengers={$visibleSpokes.direct.passengers}
			flights={$visibleSpokes.direct.flights}
		/>
		{#if $includeLayovers}
			<FlightStats 
				label={'Layover'}
				color={'var(--primary-layover)'}
				passengers={$visibleSpokes.layover.passengers}
				flights={$visibleSpokes.layover.flights}
			/>
		{/if}
	</div>
	<BarChart 
		directFlights={$visibleSpokes.direct.flights}
		layoverFlights={$visibleSpokes.layover.flights}
		referenceFlights={$spokes.flights}
	/>
</div>


<style lang="scss">
	#container {
		width: 150px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h3 {
		color: var(--neutral-700);
		font-size: 16px;
		font-weight: 600;
		line-height: 19px;
		min-height: 2.4em;
		display: block;
	}
	
	#stats {
		width: 185px;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>