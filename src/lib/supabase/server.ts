// lib/supabase/server.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cria um cliente Supabase para ser usado em Server Components,
 * Server Actions ou Route Handlers.
 *
 * Ele lê os cookies para obter a sessão do usuário de forma segura.
 */
export async function createClient() { // A função agora precisa ser 'async'
    const cookieStore = await cookies() // CORREÇÃO: Adicionado 'await' aqui

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        console.log('Erro ao definir cookie:', error)
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        console.log('Erro ao definir cookie:', error)
                    }
                },
            },
        }
    )
}