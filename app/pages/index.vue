<script lang="ts" setup>
import { toast } from "vue-sonner";

const colorMode = useColorMode();

const { $pwa } = useNuxtApp();

onMounted(() => {
	colorMode.preference = "light";
	console.log(`$pwa?.offlineReady:`, $pwa?.offlineReady);

	if ($pwa?.offlineReady) {
		toast("Offline ready!", {
			description: "You can now use your app offline",
		});
	}
});
</script>

<template>
	<div>
		<p>Landing Page</p>
		<p>PWA Installed: {{ $pwa?.isPWAInstalled ? "Yes" : "No" }}</p>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button
					variant="outline"
				>
					<Icon name="twemoji:slightly-smiling-face" />
					<Icon name="twemoji:slightly-smiling-face" />
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem @click="colorMode.preference = 'light'">
					Light
				</DropdownMenuItem>
				<DropdownMenuItem @click="colorMode.preference = 'dark'">
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem @click="colorMode.preference = 'system'">
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
