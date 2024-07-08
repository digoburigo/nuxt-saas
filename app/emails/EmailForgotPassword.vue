<script setup lang="ts">
  interface Props {
    email?: string;
    token?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    email: "email@domain.com",
    token: "<TOKEN>",
  });

  const previewText = `Troca de senha da conta de email ${props.email}`;
  const resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${props.token}`;
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EPreview>{{ previewText }}</EPreview>
      <EBody class="mx-auto my-auto font-sans bg-white">
        <EContainer
          class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]">
          <EHeading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Troca de senha
          </EHeading>
          <EText class="text-black text-[14px] leading-[24px]">
            Olá usuário, {{ props.email }},
          </EText>
          <ESection class="text-center mt-[32px] mb-[32px]">
            <EButton px="20" py="12"
              class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
              :href="resetPasswordLink">
              Alterar a senha
            </EButton>
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
