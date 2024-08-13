import { defineStore } from 'pinia';

export enum SectionCode {
  MA = 'MA',
  PH = 'PH',
  SV = 'SV',
  MT = 'MT',
  EL = 'EL',
  GM = 'GM',
  IN = 'IN',
  SC = 'SC',
  CGC = 'CGC',
  MX = 'MX',
  GC = 'GC',
  SIE = 'SIE',
  CMS = 'CMS',
}

export type SectionData = {
  name: string;
  code: SectionCode;
  codeLanguage: AllowedLanguage;
};

export type AllowedLanguage = 'java' | 'cpp' | 'python';
export const ALLOWED_LANGUAGES: AllowedLanguage[] = ['java', 'cpp', 'python'];

export function getCodeLanguageData(language: AllowedLanguage) {
  switch (language) {
    case 'cpp': {
      return {
        name: 'C++',
        fileExtension: 'cpp',
      };
    }
    case 'java': {
      return {
        name: 'Java',
        fileExtension: 'java',
      };
    }
    case 'python': {
      return {
        name: 'Python',
        fileExtension: 'py',
      };
    }
    default: {
      throw new Error('No language data found for language: ' + language);
    }
  }
}

export const Sections: Record<SectionCode, SectionData> = {
  [SectionCode.MA]: {
    name: 'Mathématiques',
    code: SectionCode.MA,
    codeLanguage: 'cpp',
  },
  [SectionCode.PH]: {
    name: 'Physique',
    code: SectionCode.PH,
    codeLanguage: 'cpp',
  },
  [SectionCode.SV]: {
    name: 'Ingénierie des Sciences du Vivant',
    code: SectionCode.SV,
    codeLanguage: 'cpp',
  },
  [SectionCode.MT]: {
    name: 'Microtechnique',
    code: SectionCode.MT,
    codeLanguage: 'cpp',
  },
  [SectionCode.EL]: {
    name: 'Génie Électrique et Électronique',
    code: SectionCode.EL,
    codeLanguage: 'cpp',
  },
  [SectionCode.GM]: {
    name: 'Génie Mécanique',
    code: SectionCode.GM,
    codeLanguage: 'cpp',
  },
  [SectionCode.IN]: {
    name: 'Informatique',
    code: SectionCode.IN,
    codeLanguage: 'java',
  },
  [SectionCode.SC]: {
    name: 'Systèmes de Communication',
    code: SectionCode.SC,
    codeLanguage: 'java',
  },
  [SectionCode.CGC]: {
    name: 'Génie Chimique',
    code: SectionCode.CGC,
    codeLanguage: 'python',
  },
  [SectionCode.MX]: {
    name: 'Science et Génie des Matériaux',
    code: SectionCode.MX,
    codeLanguage: 'python',
  },
  [SectionCode.GC]: {
    name: 'Génie Civil',
    code: SectionCode.GC,
    codeLanguage: 'python',
  },
  [SectionCode.SIE]: {
    name: "Science et Ingénierie de l'Environnement",
    code: SectionCode.SIE,
    codeLanguage: 'python',
  },
  [SectionCode.CMS]: {
    name: 'Cours de Mathématiques Spéciales',
    code: SectionCode.CMS,
    codeLanguage: 'python',
  },
};

export interface StudentData {
  sectionCode: SectionCode | undefined;
}

export const useStudentDataStore = defineStore({
  id: 'studentData',
  persist: {
    storage: persistedState.localStorage,
  },
  state: (): StudentData => ({
    sectionCode: undefined,
  }),
  getters: {
    section: (state) =>
      state.sectionCode ? Sections[state.sectionCode] : undefined,
    codeLanguage(): AllowedLanguage | undefined {
      return this.section ? this.section.codeLanguage : undefined;
    },
  },
  actions: {
    setSection(sectionCode: SectionCode) {
      this.sectionCode = sectionCode;
    },
  },
});
