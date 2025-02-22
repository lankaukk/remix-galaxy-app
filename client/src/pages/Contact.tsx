import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div>
          <h1 className="mb-4 text-4xl font-bold ">Get in Touch</h1>
          <p className="mb-6 text-lg ">
            I'm always open to new opportunities and interesting projects. Let's
            connect and discuss how we can work together.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 hover:text-[#00C2FF]"
            >
              <Mail className="h-5 w-5" />
              contact@example.com
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center gap-2  hover:text-[#00C2FF]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn Profile
            </a>
            <a
              href="https://twitter.com"
              className="flex items-center gap-2  hover:text-[#00C2FF]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              Twitter Profile
            </a>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div>
                <Input placeholder="Name" />
              </div>
              <div>
                <Input type="email" placeholder="Email" />
              </div>
              <div>
                <Textarea placeholder="Message" className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-[#FF5757] text-white hover:bg-[#FF5757]/90">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
