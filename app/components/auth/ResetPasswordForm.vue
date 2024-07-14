<script lang="ts" setup>
import { z } from "zod";

const route = useRoute("auth-reset-password___pt-BR");
const api = useApi();

onMounted(() => {
	if (!route.query.token) {
		navigateTo("/");
	}
});

const validationSchema = toTypedSchema(
	z.object({
		password: z
			.string({ required_error: "Senha é obrigatória" })
			.min(8, { message: "A senha precisa de pelo menos 8 caracteres" }),
		confirmPassword: z
			.string(({ required_error: "Senha é obrigatória" })),
	}).refine(data => data.password === data.confirmPassword, {
		message: "As senhas precisam ser as mesmas",
		path: ["confirmPassword"],
	}),
);

const form = useForm({
	validationSchema,
});

const { mutate: resetPassword, isPending, error } = api.auth.resetPassword.useMutation({
	onSuccess: () => {
		navigateTo("/auth/login");
	},
});

const onSubmit = form.handleSubmit(async (values) => {
	resetPassword({
		token: route.query.token as string,
		password: values.password,
		confirmPassword: values.confirmPassword,
	});
});
</script>

<template>
	<form
		class="space-y-3"
		@submit="onSubmit"
	>
		<FormField
			v-slot="{ componentField }"
			name="password"
		>
			<FormItem>
				<FormLabel>Nova senha</FormLabel>
				<FormControl>
					<Input
						type="password"
						required
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField
			v-slot="{ componentField }"
			name="confirmPassword"
		>
			<FormItem>
				<FormLabel>Confirmar nova senha</FormLabel>
				<FormControl>
					<Input
						type="password"
						required
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>

		<Button
			:disabled="isPending"
			type="submit"
			class="w-full"
		>
			<Icon
				v-if="isPending"
				class="w-4 h-4 mr-2 animate-spin"
				aria-hidden="true"
				name="uil:fidget-spinner"
			/>
			{{ $t('signup.account.form.confirm') }}
		</Button>
		<p>{{ error }}</p>
	</form>
</template>
