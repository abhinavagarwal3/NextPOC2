import supabase from "../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, property_id, interaction_type } = req.body;

    // Ensure all required fields are provided
    if (!user_id || !property_id || !interaction_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Insert the interaction and directly check for errors
      const { data, error } = await supabase
        .from("interactions")
        .insert([{ user_id, property_id, interaction_type }]);

      // If there's an error from Supabase, log it and return it
      if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
      }

      // Confirm data insertion success and return a success message
      return res
        .status(201)
        .json({ message: "Interaction inserted successfully", data });
    } catch (error) {
      // Catch any unexpected errors in the try-catch block
      console.error("Unexpected server error:", error);
      return res.status(500).json({ error: "Unexpected server error" });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
