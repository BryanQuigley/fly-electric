<script>
	import { formatNumber } from "../lib/utils";

	export let label;
	export let color;
	export let passengers;
	export let flights;
</script>

<div>
	<span id="label">
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect y="12" width="12" height="12" transform="rotate(-90 0 12)" fill="{color}"/>
		</svg>
		{label}</span>
	<span>
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.8863 1.125C6.8863 1.75781 6.37068 2.25 5.7613 2.25C5.12849 2.25 4.6363 1.75781 4.6363 1.125C4.6363 0.515625 5.12849 0 5.7613 0C6.37068 0 6.8863 0.515625 6.8863 1.125ZM5.5738 8.25V11.25C5.5738 11.6719 5.22224 12 4.8238 12C4.40193 12 4.0738 11.6719 4.0738 11.25V6.02344L3.39411 7.14844C3.18318 7.5 2.71443 7.61719 2.36286 7.40625C2.0113 7.19531 1.89411 6.72656 2.10505 6.375L3.46443 4.10156C3.8863 3.42188 4.61286 3 5.40974 3H6.08943C6.8863 3 7.61286 3.42188 8.03474 4.10156L9.39411 6.375C9.60505 6.72656 9.48786 7.19531 9.1363 7.40625C8.78474 7.61719 8.31599 7.5 8.10505 7.14844L7.4488 6.02344V11.25C7.4488 11.6719 7.09724 12 6.6988 12C6.27693 12 5.9488 11.6719 5.9488 11.25V8.25H5.5738Z" fill="#A1A1AA"/>
		</svg>									
		{formatNumber(passengers)}
	</span>
	<span>
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.075 2.44732C9.4125 2.27857 9.7875 2.18482 10.1625 2.18482H11.25C11.7562 2.18482 12.0937 2.69107 11.925 3.17857C11.5875 4.07857 10.9125 4.82857 10.0312 5.27857L4.9125 7.82857C4.8375 7.86607 4.74375 7.88482 4.65 7.88482H2.0625C1.89375 7.88482 1.725 7.80982 1.6125 7.67857L0.24375 6.08482C0.1125 5.93482 0.16875 5.70982 0.3375 5.61607L0.9375 5.31607C1.10625 5.24107 1.29375 5.24107 1.44375 5.31607L2.53125 5.78482L4.3875 4.84732L1.63125 3.08482C1.44375 2.95357 1.4625 2.65357 1.66875 2.55982L2.53125 2.12857C2.8125 1.97857 3.16875 1.95982 3.4875 2.07232L7.14375 3.44107L9.075 2.44732ZM0 10.2848C0 9.96607 0.2625 9.68482 0.6 9.68482H11.4C11.7187 9.68482 12 9.96607 12 10.2848C12 10.6223 11.7187 10.8848 11.4 10.8848H0.6C0.2625 10.8848 0 10.6223 0 10.2848Z" fill="#A1A1AA"/>
		</svg>
		{formatNumber(flights)}
	</span>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: .35rem;
    }

    span {
        color: var(--neutral-700);
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        display: flex;
        gap: .5em;
        align-items: center;
        white-space: nowrap;
    }

    /* Flat, native alternative to your old nested span &#label block */
    span#label {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
    }
</style>
