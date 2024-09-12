import Modal from "./Modal";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthSelect from "./CustomSelectComponent";
import CustomInputField from "./CustomInputField";
import useAddStudentModal from "@/store/useAddStudentModal";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  class: z
    .number({ invalid_type_error: "Must be a positive number!" })
    .int()
    .min(1, "Class must be a positive integer"),
  sex: z.string().min(1, "Sex is required"),
  age: z
    .number({ invalid_type_error: "Must be a positive number!" })
    .int()
    .min(1, "Age must be a positive integer"),
  siblings: z
    .number({ invalid_type_error: "Must be a positive number!" })
    .int()
    .min(0, "Siblings must be a non-negative integer"),
  gpa: z
    .number({ invalid_type_error: "Must be a positive number!" })
    .min(0)
    .max(10, "GPA must be between 0 and 10"),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentModalProps {
  onStudentAdded: () => Promise<void>;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  onStudentAdded,
}) => {
  const { toast } = useToast();
  const { isOpen, onClose } = useAddStudentModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      await onStudentAdded();
      onClose();
      reset(); // Reset the form
      toast({
        title: "Student added successfully",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        variant: "destructive",
        title: "Failed to add student",
        description: "Please try again later.",
      });
    }
  };

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <CustomInputField
        label="Name"
        name="name"
        type="text"
        placeholder="Name"
        register={register}
        errors={errors}
      />

      <CustomInputField
        label="Class*"
        name="class"
        type="number"
        valueAsANumber
        placeholder="class"
        register={register}
        errors={errors}
      />

      <CustomInputField
        label="Age*"
        name="age"
        type="number"
        valueAsANumber
        placeholder="age"
        register={register}
        errors={errors}
      />

      <AuthSelect
        label="Gender*"
        name="sex"
        options={options}
        control={control}
        errors={errors}
        placeholder="Select Gender"
      />
      <CustomInputField
        label="Siblings*"
        name="siblings"
        type="number"
        valueAsANumber
        placeholder="siblings"
        register={register}
        errors={errors}
      />

      <CustomInputField
        label="GPA*"
        name="gpa"
        type="number"
        valueAsANumber
        step="0.01"
        placeholder="gpa"
        register={register}
        errors={errors}
      />

      <div className="flex gap-2 mt-6">
        <button
          onClick={onClose}
          className="bg-transparent hover:bg-white/10 transition-colors text-black font-semibold w-full py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-safepayBlue hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
        >
          Add Student
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      noButtons
      onClose={onClose}
      title="Add Student"
      modalContent={bodyContent}
    />
  );
};

export default AddStudentModal;
