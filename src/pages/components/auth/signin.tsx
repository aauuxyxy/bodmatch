import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, Button } from "@chakra-ui/react";
import Image from "next/image";

export default function AuthSignIn({
  // ここで providers の 型を定義しています
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Sign in</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="hover:text-green-five inline-flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-xl font-bold"
                // このボタンを押すと GitHub による認証が行われます
                // また、認証後のリダイレクト先をルートパスに設定しています
                onClick={() =>
                  void signIn(provider.id, {
                    callbackUrl: "/",
                  })
                }
              >
                <Image
                  src="/images/icons_google.svg"
                  alt="Google"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
