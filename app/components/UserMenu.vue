<script setup lang="ts">
const user = useUser();

async function logout() {
	await $fetch("/api/auth/logout", {
		method: "POST",
	});
	user.value = null;
	await navigateTo("/auth/login");
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button
				variant="ghost"
				class="flex justify-start gap-x-4 p-8 text-sm font-semibold leading-6 w-full"
			>
				<Avatar>
					<AvatarImage
						src="https://github.com/radix-vue.png"
						alt="@radix-vue"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<span class="sr-only">Your profile</span>
				<span aria-hidden="true">{{ user?.email }}</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<DropdownMenuLabel>Conta</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem> Propriedades </DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="logout">
				Sair
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
