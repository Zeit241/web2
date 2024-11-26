import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <div className="container  mx-auto ">
          <h1 className="text-3xl mt-6 font-semibold text-center text-blue-600 mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            <strong>Дата вступления в силу:</strong> 21 ноября 2024 года
          </p>

          <p className="text-base text-gray-700 mb-4">
            <strong>MedLux Clinic</strong> заботится о защите вашей
            конфиденциальности и соблюдении законодательства в области защиты
            персональных данных. Эта Политика конфиденциальности объясняет, как
            мы собираем, используем, обрабатываем и защищаем вашу информацию, а
            также какие права вы имеете в отношении ваших данных.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            1. Собираемая информация
          </h2>
          <p className="text-base text-gray-700 mb-4">
            <strong>Личная информация:</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Ваше имя, контактные данные (телефон, электронная почта).</li>
            <li>
              Медицинская информация (история болезни, результаты анализов).
            </li>
            <li>Финансовая информация (данные для оплаты услуг).</li>
          </ul>
          <p className="text-base text-gray-700 mb-4">
            <strong>Техническая информация:</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>IP-адрес, геолокация.</li>
            <li>Файлы cookie для улучшения пользовательского опыта.</li>
            <li>История взаимодействия с нашим сайтом.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            2. Использование данных
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Собранная информация используется для следующих целей:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              Обеспечение медицинских услуг и ведение медицинской документации.
            </li>
            <li>Организация и подтверждение записей на приём.</li>
            <li>
              Улучшение качества обслуживания и взаимодействия с пациентами.
            </li>
            <li>
              Отправка уведомлений, включая напоминания о приёмах, результаты
              анализов или изменения в графике.
            </li>
            <li>Выполнение юридических обязательств и отчётности.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            3. Раскрытие информации третьим лицам
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Ваши данные могут быть переданы третьим сторонам только в следующих
            случаях:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Медицинским специалистам в рамках предоставления услуг.</li>
            <li>Страховым компаниям для обработки выплат.</li>
            <li>Государственным органам в соответствии с законодательством.</li>
            <li>
              Техническим партнёрам (например, хостинг-провайдерам), которые
              помогают нам поддерживать работу сайта.
            </li>
          </ul>
          <p className="text-base text-gray-700 mb-4">
            <strong>Мы не продаём ваши данные третьим лицам.</strong>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            4. Хранение и защита данных
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Мы применяем современные меры безопасности для защиты ваших данных:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Шифрование данных во время передачи и хранения.</li>
            <li>
              Ограничение доступа к информации только авторизованным
              сотрудникам.
            </li>
            <li>Регулярные аудиты и обновления систем безопасности.</li>
          </ul>
          <p className="text-base text-gray-700 mb-4">
            Срок хранения данных зависит от их типа и законодательных
            требований. Например:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              Медицинские данные хранятся в течение времени, предусмотренного
              законом.
            </li>
            <li>
              Технические данные (например, файлы cookie) удаляются после
              завершения сеанса или через определённый период времени.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            5. Ваши права
          </h2>
          <p className="text-base text-gray-700 mb-4">Вы имеете право:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Получить доступ к своим персональным данным.</li>
            <li>Исправить или обновить предоставленную информацию.</li>
            <li>
              Удалить данные, если они больше не нужны для предоставления услуг.
            </li>
            <li>
              Ограничить обработку данных или отозвать своё согласие (например,
              на маркетинговую рассылку).
            </li>
            <li>
              Подать жалобу в надзорные органы, если считаете, что ваши права
              нарушены.
            </li>
          </ul>
          <p className="text-base text-gray-700 mb-4">
            Для реализации своих прав свяжитесь с нами через контакты, указанные
            ниже.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            6. Файлы cookie
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Мы используем файлы cookie для:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Анализа посещаемости сайта и улучшения его функционала.</li>
            <li>Запоминания ваших предпочтений и ускорения работы сайта.</li>
          </ul>
          <p className="text-base text-gray-700 mb-4">
            Вы можете настроить параметры использования файлов cookie в своём
            браузере.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            7. Контактная информация
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Если у вас есть вопросы или вы хотите воспользоваться своими
            правами, свяжитесь с нами:
          </p>
          <ul className="text-base text-gray-700 mb-4">
            <li>
              <strong>Телефон:</strong> +7 (800) 123-45-67
            </li>
            <li>
              <strong>Электронная почта:</strong>{" "}
              <a
                href="mailto:privacy@medlux.ru"
                className="text-blue-600 hover:underline"
              >
                privacy@medlux.ru
              </a>
            </li>
            <li>
              <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1
            </li>
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  );
}
