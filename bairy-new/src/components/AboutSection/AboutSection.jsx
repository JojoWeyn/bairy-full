
export default function AboutSection() {
  return (
<section id="about" className="@container scroll-mt-[40px]">
  <div className="@[480px]:p-4">
    <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 @[480px]:px-0 @[480px]:pt-0">
          Почему «Байры»?
        </h2>
    <div className="@[480px]:bg-[#f9fbf9] @[480px]:rounded-xl @[480px]:p-6">
      <div className="flex flex-col gap-6 text-[#121a0f] leading-relaxed text-base @[768px]:text-lg">
        <p>
          Потому что каждый человек приходит в этот мир, связанный тонкой нитью с матерью, с домом, с жизнью.
          Когда пуповина отпадает, её не выбрасывают. Её бережно складывают в маленький мешочек — <span className="font-semibold">байры</span>.
          Его хранят всю жизнь. Потому что в нём — <span className="italic">начало. Корень. Память. Любовь.</span>
        </p>

        <p className="text-xl font-semibold">Мы назвали турбазу так не случайно.</p>
        <p>
          Мы верим, что каждому человеку нужно место, где можно остановиться, отдышаться, вспомнить, кто ты есть.
          <span className="font-semibold"> Байры</span> — это не про комфорт и вайфай. Это про <span className="italic">тишину в голове</span>.
          Про звёзды, которые ты видел в детстве. Про холодную воду, от которой смеёшься. Про запах костра, от которого хочется молчать.
          Про то, как тебя снова собирают по кусочкам — не спеша, по-матерински.
        </p>

        <p className="text-xl font-semibold">Мы хотим, чтобы, приезжая сюда, ты чувствовал себя как дома.</p>
        <p>
          Не в смысле — тапочки и телевизор, а глубже. Как будто тебя не просто ждут, а <span className="italic">всегда ждали</span>.
          Как будто гора знает твоё имя, а ветер — твои мысли.
          Чтобы ты вышел утром к реке и вдруг понял, что <span className="font-medium text-[#639155]">ничего страшного нет</span>.
          Всё на месте. <strong>Ты — на месте. Живой. Свой.</strong>
        </p>

        <p className="text-xl font-semibold">«Байры» — это не просто мешочек.</p>
        <p>
          Это место, где тебя снова связывают с тем, что по-настоящему важно.
        </p>

        <p className="italic text-[#639155] text-lg font-medium">
          Добро пожаловать. Снимай с плеч тревогу. Здесь тебе рады. Здесь ты дома.
        </p>
      </div>
    </div>
  </div>
</section>
  );
}
