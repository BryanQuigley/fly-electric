<script>
import { tooltip } from 'svooltip';
import { formatNumber } from '../lib/utils';
import { spokes } from '../lib/stores';
import { get } from 'svelte/store';

// retrieve overall flights data once
const { passengers, flights, co2 } = get(spokes);

const tooltipOptions = {
	delay: [100, 0],
	offset: 2,
};
</script>

<div>
	<h1>
		What electric plane range is needed to electrify US domestic air travel?
	</h1>

	<p>
		The 
		<span 
			class="definition"
			use:tooltip={tooltipOptions}
			title="Certified US air carriers that account for at least 1% of domestic scheduled passenger revenues"
		>
			largest US airlines
		</span> 
		carried out more than {formatNumber(flights).replace('k', ',000')} domestic passenger flights across the contiguous 
		United States in August 2022. They moved {formatNumber(passengers, 1).replace('M', ' million')} passengers, 
		emitting approximately {formatNumber(co2).replace('M', ' million')} metric tons CO<sub>2</sub>.
	</p>
	<p>
		Use the slider to choose your own flight range or select one of the electric planes in development making headway towards 
		climate-friendly aviation.
	</p>

</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 18px;
		max-width: 640px;
		font-feature-settings: "tnum" 0;
	}

	h1 {
		font-size: 28px;
		font-weight: 400;
		line-height: 34px;
		letter-spacing: -0.02em;
		text-align: center;
		color: var(--neutral-700);
	}

	p {
		color: var(--neutral-500);
		font-size: 18px;
		font-weight: 400;
		line-height: 23px;
		letter-spacing: 0em;
		text-align: justify;
	}

	.definition {
		border-bottom: 1px dashed var(--neutral-400);
		white-space: nowrap;
	}
</style>
