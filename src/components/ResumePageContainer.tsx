import { Button } from '@/components/ui/button';

export function ResumePageContainer() {
  return (
    <div className="w-4xl max-w-4xl mx-auto p-6 space-y-6">
      {/* Embedded PDF Preview */}
      <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-md">
        <iframe
          src="/crc_resume.pdf"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
      {/* Download Button */}
      <div className="flex justify-center">
        <Button asChild>
          <a href="/crc_resume.pdf" download>
            Download Résumé (PDF)
          </a>
        </Button>
      </div>
    </div>
  );
}
