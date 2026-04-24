import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FileTreeItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Mínimo de 2 caracteres."),
  subMenus: z.array(
    z.object({
      value: z.string().trim().min(1, "O campo não pode estar vazio"),
    }),
  ),
});

interface DialogFormProps {
  handleAddAccount: (data: FileTreeItem) => void;
}

const DialogForm = ({ handleAddAccount }: DialogFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subMenus: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "subMenus",
    control: form.control,
  });

  const handleSendForm = ({ name, subMenus }: FormSchema) => {
    const now = new Date().getTime();
    const result = subMenus.map((item, index) => ({
      id: now + index + 1,
      name: item.value,
    }));
    handleAddAccount({
      id: now,
      name,
      items: result,
    });
    setDialogOpen(false);
    form.reset();
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          New <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Caixa de Entrada</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSendForm)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs text-zinc-500 font-bold uppercase tracking-wider dark:text-white">
                    Nome da Caixa
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full h-10 border-2 border-black rounded-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium dark:border-white"
                      placeholder="Ex: Suporte ao Cliente"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  <FormField
                    control={form.control}
                    name={`subMenus.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative flex items-center">
                            <span className="absolute -left-4 w-4 h-[2px] bg-zinc-200 dark:border-zinc-800" />
                            <Input
                              {...field}
                              placeholder={`Item ${index + 1}`}
                              className="border-2 border-black dark:border-white rounded-none focus-visible:ring-0 h-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                    className="border-2 border-black dark:border-white rounded-none hover:bg-red-500 hover:text-white transition-colors h-10 w-10 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 border-2 border-black dark:border-white rounded-none hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold text-xs uppercase"
                onClick={() => append({ value: "" })}
              >
                + Adicionar Sub-item
              </Button>
            </div>

            <Button className="w-full">Enviar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
