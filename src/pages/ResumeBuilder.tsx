
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, FileCheck, Download } from "lucide-react";

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create a professional resume in minutes
            </p>
          </div>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create">Create Resume</TabsTrigger>
              <TabsTrigger value="upload">Upload Existing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Standard Resume</CardTitle>
                    <CardDescription>
                      A clean, professional layout suitable for most industries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="h-48 w-36 border border-dashed rounded-md flex items-center justify-center mb-4">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button>Start Building</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Creative Resume</CardTitle>
                    <CardDescription>
                      A modern design that helps you stand out from the crowd
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="h-48 w-36 border border-dashed rounded-md flex items-center justify-center mb-4">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button>Start Building</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Upload Your Existing Resume</CardTitle>
                  <CardDescription>
                    We'll help you optimize and improve your current resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center mb-6">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Drag and drop your resume file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, up to 5MB
                    </p>
                  </div>
                  <Button>Upload Resume</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <FileCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium mb-2">ATS-Friendly Format</h3>
                <p className="text-sm text-muted-foreground">
                  Designed to pass through Applicant Tracking Systems
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Download className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium mb-2">Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Download as PDF, DOCX, or plain text
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium mb-2">Expert Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from professionally designed templates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
