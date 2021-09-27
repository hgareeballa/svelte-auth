<script context="module">
	import { session } from '$app/stores';
</script>

<script>
	export let user = $session.user;
</script>

<h1>Welcome to SvelteKit oAuth Application</h1>

{#if user}
	<h1>Welcome {user}</h1>
	<a href="/logout">
		<button> Logout using Github</button>
	</a>
{:else}
	<a href="/login">
		<button> Login using Github</button>
	</a>
{/if}
