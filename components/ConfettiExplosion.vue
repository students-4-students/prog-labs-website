<script setup lang="ts">
  export interface JSConfettiApi {
    JSConfetti: {
      new (): {
        addConfetti: (options?: {
          emojis: string[];
          emojiSize?: number;
          confettiNumber?: number;
        }) => void;
      };
    };
  }

  declare global {
    interface Window extends JSConfettiApi {}
  }

  const { $script } = useScriptNpm<JSConfettiApi>({
    packageName: 'js-confetti',
    file: 'dist/js-confetti.browser.js',
    version: '0.12.0',
    scriptOptions: {
      bundle: true,
      use() {
        return { JSConfetti: window.JSConfetti };
      },
    },
  });
  onMounted(() => {
    $script.then(({ JSConfetti }) => {
      const confetti = new JSConfetti();
      confetti.addConfetti({
        emojis: ['🧑‍💻', '⌨️', '✨', '✅', '📖', '🔥'],
        emojiSize: 100,
        confettiNumber: 50,
      });
    });
  });
</script>
