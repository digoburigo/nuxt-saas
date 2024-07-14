<script setup lang="ts">
const route = useRoute();
const api = useApi();

const { mutate: verifyEmail, isPending, error } = await api.auth.verifyEmail.useMutation({
	onSuccess: () => {
		navigateTo("/auth/verify-email/success");
	},
});

onMounted(() => {
	const token = route.query.token as string;
	if (!token) {
		navigateTo("/auth/login");
	}

	verifyEmail({ token });
});
</script>

<template>
	<div class="w-screen h-screen flex flex-col justify-center">
		<Card class="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle class="text-xl">
					Verificação de email
				</CardTitle>
				<CardDescription>
					Entre com suas informações para criar uma conta
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{{ isPending ? 'Verificando seu email...' : 'Operação realizada' }}</p>
				<p v-if="error">
					{{ error }}
				</p>
			</CardContent>
		</Card>
	</div>
</template>
