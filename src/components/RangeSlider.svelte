<script>
	import LayoverCheckbox from "/src/components/LayoverCheckbox.svelte";

	import { range } from "../lib/stores";
	import { scalePow } from 'd3';
  import { onMount } from "svelte";
	import { draggable } from '@neodrag/svelte'
	import { tooltip } from 'svooltip';
	
	let ready = false;
	let track, handle;
	
	// construct scale
	const scale = scalePow()
	.domain([0,1])
	.range([100,2500])
	.exponent(2.5)
	.clamp(true);
	
	onMount(() => {
		// set slider to initial position
		positionHandle();
		ready = true;
	});

	// position handle on mount and during resize
	function positionHandle() {
		dragOptions.position.x = scale.invert($range) * (track.clientWidth - handle.clientWidth) + handle.clientWidth/2;
	}

	function throttle(fn, limit) {
	let inThrottle;
		return function (...args) {
			if (!inThrottle) {
				fn.apply(this, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		};
	}
	// Move handle
	const dragOptions = {
		axis: 'x',
		bounds: 'parent',
		position: {
			// x: scale.invert($range) + 200
		},
		onDrag: throttle(e => {
			// map x pos to 0-1 range
			const offset = e.offsetX - handle.clientWidth/2;
			const offsetPercent = offset / (track.clientWidth - handle.clientWidth);
			// map to range
			range.set(Math.round(scale(offsetPercent)));
		}, 100),
		// grid: [5,5]
	};


	let ticks = [
		{ range: 100, label: "100" },
		{ range: 124, label: "HA ES-30", class: 'plane' },
		{ range: 288, label: "Eviation Alice", class: 'plane' },
		{ range: 460, label: "Wright Spirit", class: 'plane' },
		{ range: 500, label: "500" },
		{ range: 1000, label: "1000" },
		{ range: 1500, label: "1500" },
		{ range: 2000, label: "2000" },
		{ range: 2500, label: "2500" },
	];
	// compute x offset in %
	ticks = ticks.map(tick => {
		return {
			...tick,
			x: scale.invert(tick.range) * 100,
		}
	});

	const tooltipOptions = {
		delay: [100, 0],
		offset: 2,
	};

	function setRange(target) {
		range.set(target);
		// set slider to initial position
		dragOptions.position.x = scale.invert($range) * (track.clientWidth - handle.clientWidth) + handle.clientWidth/2;
	}

	const planeIcon = '<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5469 5C12.3438 5 13.75 5.67969 13.75 6.5C13.75 7.34375 12.3438 8 11.5469 8H8.80469L6.46094 12.125C6.32031 12.3594 6.0625 12.5 5.80469 12.5H4.49219C4.23438 12.5 4.04688 12.2656 4.11719 12.0312L5.26562 8H2.875L1.84375 9.35938C1.77344 9.45312 1.67969 9.5 1.5625 9.5H0.578125C0.390625 9.5 0.25 9.35938 0.25 9.17188C0.25 9.14844 0.25 9.125 0.25 9.10156L1 6.5L0.25 3.92188C0.25 3.89844 0.25 3.875 0.25 3.82812C0.25 3.66406 0.390625 3.5 0.578125 3.5H1.5625C1.67969 3.5 1.77344 3.57031 1.84375 3.66406L2.875 5H5.26562L4.11719 0.992188C4.04688 0.757812 4.23438 0.5 4.49219 0.5H5.80469C6.0625 0.5 6.32031 0.664062 6.46094 0.898438L8.80469 5H11.5469Z" fill="white"/></svg>';
</script>

<svelte:window on:resize={positionHandle} />

<div>
	<div id="title-row">
		<h3>
			Range in miles 
			<svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.89062 5.03906L10.4297 4.5L9.89062 3.98438L6.51562 0.609375L6 0.0703125L4.92188 1.125L5.46094 1.66406L7.54688 3.75H0.75H0V5.25H0.75H7.54688L5.46094 7.35938L4.92188 7.875L6 8.95312L6.51562 8.41406L9.89062 5.03906Z" fill="black"/>
			</svg>				
		</h3>
		<LayoverCheckbox client:load />
	</div>
	
	<div id="track" bind:this={track}>
		<div id="bar" class:visible={ready} style="width: {scale.invert(Math.max(102,$range))*100}%"></div>
		<div id="handle" 
			bind:this={handle} 
			class:visible={ready}
			use:draggable={dragOptions}
			data-call-to-action="Drag me!"
		>
			<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.06505 1.28995C6.06505 1.47135 6.00459 1.63259 5.88365 1.75353L2.47734 5.15984L5.88365 8.58631C6.14568 8.82818 6.14568 9.25145 5.88365 9.49332C5.64178 9.75534 5.21851 9.75534 4.97664 9.49332L1.10675 5.62342C0.844726 5.38156 0.844726 4.95829 1.10675 4.71642L4.97665 0.846522C5.21851 0.584498 5.64178 0.584498 5.88365 0.846523C6.00459 0.967457 6.06505 1.1287 6.06505 1.28995Z" fill="var(--neutral-200)"/>
			</svg>
			<span>{$range}</span>
			<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.583385 9.02975C0.583385 8.84835 0.643852 8.68711 0.764786 8.56617L4.1711 5.15986L0.764786 1.73339C0.502762 1.49152 0.502762 1.06825 0.764786 0.826383C1.00665 0.564359 1.42992 0.564359 1.67179 0.826383L5.54169 4.69628C5.80371 4.93815 5.80371 5.36142 5.54169 5.60329L1.67179 9.47318C1.42992 9.7352 1.00665 9.7352 0.764786 9.47318C0.643852 9.35225 0.583385 9.191 0.583385 9.02975Z" fill="var(--neutral-200)"/>
			</svg>
		</div>

		<div id="ticks">
			{#each ticks as tick}
				<span 
					style="margin-left: {tick.x}%;" 
					class="tick" 
					class:plane="{tick.class==='plane'}"
					on:click={setRange(tick.range)}
				>
					{#if tick.tooltip}
						<span>{tick.label}</span>
					{:else}
						{tick.label}
					{/if}
				</span>
			{/each}
		</div>
	</div>

</div>

<style>
	@keyframes pulse {
		50% { color: var(--neutral-700); transform: scale(1.05); }
	}

	#title-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	#title-row h3 {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 14px;
		font-weight: 600;
		line-height: 17px;
		letter-spacing: 0em;
		color: var(--neutral-700);
	}
	#title-row path {
		fill: var(--neutral-700);
	}

	#track {
		width: 100%;
		background-color: var(--neutral-200);
		height: 4px;
		position: relative;
		margin: 2.25rem 0 1.5rem 0;
		padding: 0 42px;
		box-sizing: border-box;
	}

	#track #bar {
		background-color: var(--neutral-500);
		height: 100%;
		position: absolute;
		left: 0;
		transition: opacity .25s ease-in-out;
	}
	#track #bar:not(.visible) {
		opacity: 0;
	}

	#track #handle {
		z-index: 2;
		background-color: #000;
		color: #fff;
		width: 94px;
		height: 36px;
		top: -16px;
		left: -47px;
		border-radius: 20px;
		position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 8px !important;
		flex-shrink: 0;
		cursor: grab;
		box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: opacity .25s ease-in-out;
	}
	#track #handle:not(.visible) {
		opacity: 0;
	}
	#track #handle:hover {
		transform: scale(1.05); /* Fixed scale bug (scale(2) would make it gigantic) */
		outline: 3px solid rgba(0,0,0,.15);
	}
	#track #handle:active {
		cursor: grabbing;
	}
	#track #handle * {
		pointer-events: none;
	}
	#track #handle span {
		font-size: 16px;
		font-weight: 600;
		line-height: 19px;
		letter-spacing: 0em;
		text-align: center;
	}
	#track #handle:not(.neodrag-dragged):not(.neodrag-dragging):before {
		content: attr(data-call-to-action);
		position: absolute;
		height: 36px;
		width: 100%;
		pointer-events: none;
		bottom: -100%;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: 400;
		line-height: 17px;
		letter-spacing: 0em;
		text-align: center;
		color: var(--neutral-500);
		animation: pulse 2s infinite ease-in-out;
	}

	#ticks {
		position: relative;
		width: 100%;
		z-index: 1;
	}
	#ticks .tick {
		position: absolute;
		width: 1px;
		display: flex;
		justify-content: center;
		flex-direction: row;
		font-size: 12px;
		font-weight: 400;
		line-height: 14px;
		letter-spacing: 0em;
		text-align: center;
		color: var(--neutral-500);
		cursor: pointer;
		height: 14px;
		align-items: flex-start;
		white-space: nowrap;
		margin-top: 4px;
		border-top: 4px solid var(--neutral-300);
	}
	#ticks .tick:hover {
		color: var(--neutral-700);
	}
	#ticks .plane {
		border-bottom: 4px solid var(--neutral-300);
		border-top: 0;
		margin-top: -18px;
		align-items: flex-end;
	}
</style>

