import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { ptId, email } = await req.json();

  // 1. Find evt. eksisterende auth user
  const { data: existingUsers, error: listError } =
    await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (listError) {
    return NextResponse.json(
      { error: listError.message },
      { status: 400 }
    );
  }

  let user =
    existingUsers.users.find((u) => u.email === email) ?? null;

  // 2. Opret auth user hvis den ikke findes
  if (!user) {
    const { data, error } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        password: crypto.randomUUID(),
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    user = data.user;
  }

  // 3. Opdater PT record
  const { error: updateError } = await supabaseAdmin
    .from("pts")
    .update({
      status: "approved",
      is_active: true,
      user_id: user.id,
    })
    .eq("id", ptId);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
