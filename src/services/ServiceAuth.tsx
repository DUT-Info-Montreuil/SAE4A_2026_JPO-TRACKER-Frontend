const URL: string = "http://localhost:5000";

export default class ServiceAuth {
    static login(mot_de_passe: string): Promise<{token: string}> {
        return fetch(`${URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({mot_de_passe}),
            headers: {"Content-Type": "application/json"},
        }).then(res => {
            if (!res.ok) throw new Error("Mot de passe incorrect");
            return res.json();
        });
    }

    static changerMotDePasse(ancien_mot_de_passe: string, nouveau_mot_de_passe: string): Promise<any> {
        const token = localStorage.getItem("token");
        return fetch(`${URL}/auth/changer-mot-de-passe`, {
            method: "PUT",
            body: JSON.stringify({ancien_mot_de_passe, nouveau_mot_de_passe}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => {
            if (!res.ok) throw new Error("Ancien mot de passe incorrect");
            return res.json();
        });
    }
}
