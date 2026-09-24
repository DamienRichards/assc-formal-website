import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/use-reveal";

type Status = "idle" | "uploading" | "done" | "error";

const BUCKET = "guest-photos";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

export function PhotoDrop() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [message, setMessage] = useState("");

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setStatus("uploading");
    setProgress({ done: 0, total: list.length });
    setMessage("");

    const failed: string[] = [];
    for (const [i, file] of list.entries()) {
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName(file.name)}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          contentType: file.type || "application/octet-stream",
        });
      if (error) failed.push(file.name);
      setProgress({ done: i + 1, total: list.length });
    }

    if (failed.length > 0) {
      setStatus("error");
      setMessage(
        `${failed.length} of ${list.length} photo(s) didn't go through. Please try those again.`,
      );
    } else {
      setStatus("done");
      setMessage(
        `Thank you — ${list.length} photo${list.length > 1 ? "s" : ""} safely received.`,
      );
    }
  }

  return (
    <section id="photos" className="mx-auto max-w-3xl px-5 pb-28">
      <div
        ref={ref}
        data-visible={visible}
        className="reveal card-elegant rounded-2xl p-7 text-center sm:p-12"
      >
        <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
          Photo memory drop
        </p>
        <h2 className="mt-3 font-display text-4xl text-gilded sm:text-5xl">
          Drop Your Photos Here
        </h2>
        <div className="rule-gold mx-auto mt-6 w-32" />
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Share your candid shots from the evening — the dance floor, the table,
          the in-between moments. Everything dropped here is gathered into one
          album and shared with everyone after the formal.
        </p>

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void upload(e.dataTransfer.files);
          }}
          className={`mt-9 cursor-pointer rounded-xl border border-dashed px-6 py-12 transition-colors duration-300 ${
            dragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/70 hover:bg-primary/5"
          }`}
        >
          <div className="font-display text-2xl text-champagne">
            Tap to choose photos
          </div>
          <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            or drag them into this frame
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => void upload(e.target.files)}
        />

        {status === "uploading" && (
          <p className="mt-6 text-sm text-muted-foreground">
            Uploading {progress.done} of {progress.total}…
          </p>
        )}
        {status === "done" && (
          <p className="mt-6 text-sm text-primary">{message}</p>
        )}
        {status === "error" && (
          <p className="mt-6 text-sm text-destructive">{message}</p>
        )}

        <p className="mt-8 text-xs text-muted-foreground/70">
          Uploads are private — only the ASSC committee can see them before the
          album is shared.
        </p>
      </div>
    </section>
  );
}
