import Form from "./form";

const ContentRight = () => {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-light">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground font-sans dark:text-black">
            Bem-vindo de volta
          </h2>
          <p className="font-sans dark:text-black">
            Faça login para acessar o painel de comunicação.
          </p>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default ContentRight;
