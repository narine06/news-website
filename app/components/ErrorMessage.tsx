interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
      {message}
    </div>
  );
}