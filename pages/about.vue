<script lang="ts" setup>
  import {
    LucideLaptop,
    LucideBook,
    LucideFolderCode,
    LucidePenTool,
  } from 'lucide-vue-next';

  interface AboutCategoryMemberData {
    name: string;
    photoUrl: string;
  }

  interface AboutCategoryData {
    title: string;
    icon: any;
    members: (AboutCategoryMemberData | string)[];
    contact?: {
      email?: string;
      telegram?: string;
      discord?: string;
      linkedIn?: string;
      github?: string;
    };
  }

  const data: AboutCategoryData[] = [
    {
      title: 'Référent de cours & Responsable',
      icon: LucideBook,
      members: ['Simon'],
      contact: {
        email: 'smnlefort@gmail.com',
        telegram: '@androz2091',
        discord: '@androz2091',
        linkedIn: 'simonlefort',
      },
    },
    {
      title: 'Développeur principal & coordinateur web',
      icon: LucideFolderCode,
      members: ['Maxence'],
      contact: {
        email: 'maxence.espagnet16@gmail.com',
        discord: '@max0253',
        linkedIn: 'maxence-espagnet',
        github: 'mw3y',
      },
    },
    {
      title: 'Développeurs',
      icon: LucideLaptop,
      members: ['Nicolas', 'Eliott', 'Antoine'],
    },
    {
      title: 'Rédacteurs de la série 1',
      icon: LucidePenTool,
      members: ['Emmanuel', 'Mehdi', 'Paolo', 'Blanche'],
    },
    {
      title: 'Rédacteurs de la série 2 et 3',
      icon: LucidePenTool,
      members: ['Habib', 'Eliott', 'Ali', 'Paolo', 'Blanche'],
    },
  ];
</script>

<template>
  <div class="flex flex-col 2xl:flex-row px-4 md:px-8 py-4 w-full h-full gap-4">
    <div class="flex flex-col basis-7/12 gap-y-8">
      <div class="flex flex-col gap-2">
        <h2 className="text-4xl font-bold tracking-normal">
          Quelle est l'<span class="text-primary underline">équipe</span>
          derrière ce site web ?
        </h2>
        <p class="text-2xl text-foreground/85">
          Nisi veniam consectetur adipisicing velit. Sit culpa labore labore
          aliquip deserunt.
        </p>
      </div>
      <div class="flex flex-wrap gap-x-8 gap-y-5">
        <div
          class="space-y-3"
          v-for="{ title, icon, members, contact } in data"
        >
          <AboutCategory v-if="title">
            <template #icon>
              <component :is="icon" class="h-5 w-5" />
            </template>
            {{ title }}
          </AboutCategory>
          <div class="flex flex-wrap gap-2">
            <AboutInfo
              :name="member.photoUrl !== undefined ? member.name : member"
              :photoUrl="member.photoUrl"
              v-for="member in members"
            />
            <div
              v-if="contact"
              class="flex flex-col border rounded-lg gap-1 p-3 min-w-80"
            >
              <a
                v-if="contact.email"
                class="contact-element"
                :href="`mailto:${contact.email}`"
              >
                <LucideMail class="h-4" />{{ contact.email }}
              </a>
              <a
                v-if="contact.linkedIn"
                class="contact-element"
                :href="`https://linkedin.com/in/${contact.linkedIn}`"
              >
                <NuxtImg src="/logos/linkedIn.svg" class="w-4 h-4 m-1" />
                {{ contact.linkedIn }}
              </a>
              <div v-if="contact.telegram" class="contact-element">
                <NuxtImg src="/logos/telegram.svg" class="w-4 h-4 m-1 mr-0" />
                <LucideDiscord class="h-4" />{{ contact.telegram }}
              </div>
              <a
                v-if="contact.github"
                class="contact-element"
                :href="`https://github.com/${contact.github}`"
              >
                <NuxtImg
                  src="/logos/github.svg"
                  class="h-4 w-4 m-1 dark:invert"
                />
                {{ contact.github }}
              </a>
              <div v-if="contact.discord" class="contact-element">
                <NuxtImg src="/logos/discord.svg" class="w-4 h-4 m-1" />
                {{ contact.discord }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex basis-5/12">
      <NuxtImg
        class="h-full w-full border shadow-lg object-cover rounded-xl"
        src="/illustrations/team-photo-placeholder.png"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
  a {
    @apply underline underline-offset-2;
  }

  .contact-element {
    @apply flex items-center gap-1;
  }
</style>
