CREATE TABLE public.barrio_invite
(
    id uuid PRIMARY KEY default uuid_generate_v1(),
    barrio_id integer unique REFERENCES barrio (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE public.barrio_invite
    OWNER to bautista;