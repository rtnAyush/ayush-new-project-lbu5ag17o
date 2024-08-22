// import NextAuth from 'next-auth';
// import Github from 'next-auth/providers/github';

// export const { handlers : { GET, POST }, auth, signIn, signOut } = NextAuth({
//     providers: [
//         Github({
//         clientId: process.env.GITHUB_ID || '',
//         clientSecret: process.env.GITHUB_SECRET || ''
//         }),
//         CredentialProvider({
//             name: 'Email and Password',
//             async authorize(credentials) {
//                 const
//             }
//         })
//     ],
//     callbacks: {
//         async signIn({ user, account, profile }) {
//             if (account?.provider === 'github') {
//                 connectToDatabase();
//                 try {
//                     const user = await User.findOne({ email: profile.email });
//                     if (!user) {
//                         await new User({
//                             email: profile.email,
//                             name: profile.name,
//                             image: profile.image
//                         }).save();
//                     }
//                     return true;
//                 } catch (error) {
//                     console.log(error);
//                     return false;
//                 }
//             }
//             return true;
//         }
//     }
// })
