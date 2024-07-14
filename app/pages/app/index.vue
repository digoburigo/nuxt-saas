<script setup lang="ts">
definePageMeta({
	middleware: "protected",
});

const api = useApi();
const user = useUser();

// se tiver apenas 1 time, redireciona para o time
// se tiver mais de 1 time, mostra a lista de times

const { mutate: logoutUser } = api.auth.logout.useMutation({
	onSuccess: () => {
		navigateTo("/auth/login");
		user.value = null;
	},
});
</script>

<template>
	<div>
		<p>Escolher time</p>
		<form @submit.prevent="() => logoutUser()">
			<Button type="submit">
				Logout
			</Button>
		</form>
	</div>
</template>
