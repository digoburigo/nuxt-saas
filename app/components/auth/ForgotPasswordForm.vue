<script lang="ts" setup>
import { z } from "zod";

const api = useApi();

const { mutate: forgotPassword, isPending, error } = api.auth.forgotPassword.useMutation({
	onSuccess: () => {
		navigateTo("/auth/forgot-password/success", { redirectCode: 301 });
	},
});

const form = useForm({
	validationSchema: toTypedSchema(
		z.object({
			email: z.string().email(),
		}),
	),
});

const onSubmit = form.handleSubmit((values) => {
	forgotPassword({
		email: values.email,
	});
});
</script>

<template>
	<form
		class="flex flex-col gap-4"
		@submit="onSubmit"
	>
		<FormField
			v-slot="{ componentField }"
			name="email"
		>
			<FormItem>
				<FormLabel> Email </FormLabel>
				<FormControl>
					<Input
						type="email"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<Button
			:disabled="isPending"
			type="submit"
		>
			<Icon
				v-if="isPending"
				class="w-4 h-4 mr-2 animate-spin"
				aria-hidden="true"
				name="uil:fidget-spinner"
			/>
			Confirmar
		</Button>
		<p>{{ error }}</p>
	</form>
</template>
