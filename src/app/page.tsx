import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header
        title="Тексти, що оживають: читай, перекладай, слухай"
        subtitle="Завантаж текст, обери мови для перекладу та насолоджуйся навчанням у новому форматі."
      />
      <main className="">
        <button>Змінити мову</button>
      </main>
    </div>
  );
}
