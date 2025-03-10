
import { ColdDmGeneratorProps } from './cold-message/types';
import { ColdMessageForm } from './cold-message/ColdMessageForm';
import { GeneratedMessage } from './cold-message/GeneratedMessage';
import { useColdMessage } from './cold-message/useColdMessage';

export function ColdDmGenerator({ initialValues, compact = false, jobTitle }: ColdDmGeneratorProps) {
  const {
    formData,
    generatedMessage,
    isGenerating,
    handleInputChange,
    generateMessage
  } = useColdMessage({ initialValues, jobTitle });

  return (
    <div className="space-y-4">
      <ColdMessageForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={generateMessage}
        isGenerating={isGenerating}
        compact={compact}
      />
      
      {generatedMessage && (
        <GeneratedMessage message={generatedMessage} />
      )}
    </div>
  );
}
