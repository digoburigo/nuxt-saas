<script setup lang="ts">
import { Tailwind, Button, Html, Head, Preview, Body, Container, Heading, Text, Section } from "@vue-email/components";
import { tailwindConfig } from "./tailwind-config";
import type { EmailForgotPasswordProps } from "./email-props";

const props = withDefaults(defineProps<EmailForgotPasswordProps>(), {
  email: "email@domain.com",
  token: "<TOKEN>",
});

const previewText = `Troca de senha da conta de email ${props.email}`;
const resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${props.token}`;
</script>

<template>
  <Tailwind :config="tailwindConfig">
    <Html>
      <Head />
      <Preview>{{ previewText }}</Preview>

      <Body class="mx-auto my-auto font-sans bg-white">
        <Container class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]">
          <Heading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Troca de senha
          </Heading>
          <Text class="text-black text-[14px] leading-[24px]">
            Olá usuário, {{ props.email }},
          </Text>
          <Section class="text-center mt-[32px] mb-[32px]">
            <Button
              class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center p-3"
              :href="resetPasswordLink"
            >
              Alterar a senha
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
