"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, MovieFormData } from "../../schemas/movieSchema";
import { useAddMovieMutation } from "@/redux/movie/movieApi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export const CreateMovieForm = () => {
  const [addMovie, { isLoading, isSuccess }] = useAddMovieMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const { toast } = useToaster()
  const { theme } = useTheme();
  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: [],
      wishlist: false,
    },
  });

  const onSubmit = async (formData: MovieFormData) => {
    try {
      let imageUrl;

      if (selectedFile) {
        imageUrl = await uploadToCloudinary(selectedFile);
      }

      const payload = {
        ...formData,
        imageUrl,
      };

      await addMovie(payload).unwrap();

      form.reset({
        title: "",
        description: "",
        genre: [],
        wishlist: false,
      });

      setSelectedFile(null);

      toast("Success");
    } catch (err) {
     
     
      toast("Failed to add movie. Please try again.");
    }
  };

  return (
    <Card
      className={`w-full max-w-md mx-auto ${
        theme == "dark" || theme == "system" ? "bg-black" : "bg-white"
      } text-xs `}
    >
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter movie title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter movie description"
                      className="min-h-[120px] focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="space-y-2">
              <FormLabel>Movie Poster</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-1 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-3 text-muted-foreground"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or GIF (MAX. 2MB)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden "
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </FormControl>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </FormItem>

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genres</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Action, Drama, Sci-Fi (comma-separated)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value
                            .split(",")
                            .map((g) => g.trim())
                            .filter(Boolean)
                        );
                      }}
                      value={field.value.join(", ")}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate multiple genres with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wishlist"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add to Wishlist</FormLabel>
                    <FormDescription>
                      Add this movie to your wishlist for later viewing
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`w-fit cursor-pointer ${
                theme == "dark" ? "border border-white" : "border border-black"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Adding Movie...
                </>
              ) : (
                "Add Movie"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await res.json();

  return data.secure_url;
};
